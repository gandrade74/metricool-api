create table providers (
	id serial primary key,
	name varchar
);

create table organizations (
	id serial primary key,
	name varchar,
	url varchar,
	provider_id int references providers (id)
);

create table projects (
	id serial primary key,
  key varchar,
	name varchar,
	url varchar,
	original_id int,
	organization_id int references organizations(id),
	unique (original_id, organization_id)
);

create table project_work_types (
	id serial primary key,
	original_id int,
	name varchar,
	description varchar,
	project_id int,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
);

create table project_stream_steps (
	id serial primary key,
	project_id int,
	name varchar,
	foreign key (project_id) references projects (id)
);

create table project_statuses (
	id serial primary key,
	original_id int,
	project_id int,
	name varchar,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
);

create table project_stream_steps_statuses (
	project_id int,
	step_id int,
	status_id int,
	foreign key (project_id) references projects (id),
	foreign key (step_id) references project_stream_steps (id),
	foreign key (status_id) references project_statuses (id)
);

create table project_issues (
	id serial primary key,
	original_id int,
	key varchar,
	img varchar,
	summary varchar,
	project_id int,
	foreign key (project_id) references projects (id)
);

create table project_issues_status_history (
	issue_id int,
	status_from_id int,
	status_to_id int,
	updated_at timestamp,
	project_id int,
	foreign key (issue_id) references project_issues (id),
	foreign key (status_from_id) references project_issues (id),
	foreign key (status_to_id) references project_issues (id),
	foreign key (project_id) references projects (id)
);

create table import_history
(
	import_id serial primary key,
	project_id int,
	started timestamp,
	completed timestamp,
	status varchar,
	message varchar,
	type varchar,
	foreign key (project_id) references projects (id)
);
