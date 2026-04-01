import { pgTable, text, integer, real, boolean, timestamp, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['admin', 'quality', 'dept_head', 'viewer']);
export const statusEnum = pgEnum('status', ['conforme', 'partiel', 'non-conforme', 'na']);
export const priorityEnum = pgEnum('priority', ['ROP', 'imperatif', 'high', 'normal']);
export const sourceEnum = pgEnum('source', ['excel', 'his', 'manual']);
export const mappingTypeEnum = pgEnum('mapping_type', ['full', 'partial']);
export const importStatusEnum = pgEnum('import_status', ['pending', 'processing', 'success', 'error']);

// Tables
export const frameworks = pgTable('frameworks', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  version: text('version').notNull(),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const domains = pgTable('domains', {
  id: text('id').primaryKey(),
  frameworkId: text('framework_id').references(() => frameworks.id).notNull(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  weight: integer('weight').default(10),
});

export const standards = pgTable('standards', {
  id: text('id').primaryKey(),
  domainId: text('domain_id').references(() => domains.id).notNull(),
  code: text('code').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  priority: priorityEnum('priority').default('normal'),
});

export const criteria = pgTable('criteria', {
  id: text('id').primaryKey(),
  standardId: text('standard_id').references(() => standards.id).notNull(),
  code: text('code').notNull(),
  description: text('description').notNull(),
  evidenceRequired: boolean('evidence_required').default(true),
  imperatif: boolean('imperatif').default(false),
});

export const criteriaMapping = pgTable('criteria_mappings', {
  id: serial('id').primaryKey(),
  criteriaIdSource: text('criteria_id_source').references(() => criteria.id).notNull(),
  criteriaIdTarget: text('criteria_id_target').references(() => criteria.id).notNull(),
  mappingType: mappingTypeEnum('mapping_type').default('partial'),
});

export const departments = pgTable('departments', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  code: text('code').notNull(),
  headName: text('head_name'),
  headEmail: text('head_email'),
});

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').default('viewer'),
  departmentId: text('department_id').references(() => departments.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const assessments = pgTable('assessments', {
  id: serial('id').primaryKey(),
  criteriaId: text('criteria_id').references(() => criteria.id).notNull(),
  departmentId: text('department_id').references(() => departments.id).notNull(),
  status: statusEnum('status').default('na'),
  assessedBy: text('assessed_by').references(() => users.id),
  assessedAt: timestamp('assessed_at').defaultNow(),
  notes: text('notes'),
});

export const evidenceFiles = pgTable('evidence_files', {
  id: serial('id').primaryKey(),
  assessmentId: integer('assessment_id').references(() => assessments.id).notNull(),
  filePath: text('file_path').notNull(),
  fileType: text('file_type'),
  uploadedBy: text('uploaded_by').references(() => users.id),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
  validated: boolean('validated').default(false),
});

export const actionPlans = pgTable('action_plans', {
  id: serial('id').primaryKey(),
  assessmentId: integer('assessment_id').references(() => assessments.id).notNull(),
  description: text('description').notNull(),
  responsible: text('responsible').references(() => users.id),
  deadline: timestamp('deadline'),
  status: text('status').default('todo'), // todo | in_progress | done
  priority: priorityEnum('priority').default('normal'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const kpiSnapshots = pgTable('kpi_snapshots', {
  id: serial('id').primaryKey(),
  kpiCode: text('kpi_code').notNull(),
  value: real('value').notNull(),
  measuredAt: timestamp('measured_at').defaultNow(),
  departmentId: text('department_id').references(() => departments.id),
  source: sourceEnum('source').default('manual'),
});

export const dataImports = pgTable('data_imports', {
  id: serial('id').primaryKey(),
  sourceType: text('source_type').notNull(), // excel | his
  fileName: text('file_name'),
  templateCode: text('template_code'),
  importedBy: text('imported_by').references(() => users.id),
  importedAt: timestamp('imported_at').defaultNow(),
  rowsProcessed: integer('rows_processed').default(0),
  rowsError: integer('rows_error').default(0),
  status: importStatusEnum('status').default('pending'),
});

// Relations
export const frameworksRelations = relations(frameworks, ({ many }) => ({
  domains: many(domains),
}));

export const domainsRelations = relations(domains, ({ one, many }) => ({
  framework: one(frameworks, { fields: [domains.frameworkId], references: [frameworks.id] }),
  standards: many(standards),
}));

export const standardsRelations = relations(standards, ({ one, many }) => ({
  domain: one(domains, { fields: [standards.domainId], references: [domains.id] }),
  criteria: many(criteria),
}));

export const criteriaRelations = relations(criteria, ({ one, many }) => ({
  standard: one(standards, { fields: [criteria.standardId], references: [standards.id] }),
  assessments: many(assessments),
}));

export const assessmentsRelations = relations(assessments, ({ one, many }) => ({
  criteria: one(criteria, { fields: [assessments.criteriaId], references: [criteria.id] }),
  department: one(departments, { fields: [assessments.departmentId], references: [departments.id] }),
  evidenceFiles: many(evidenceFiles),
  actionPlans: many(actionPlans),
}));
