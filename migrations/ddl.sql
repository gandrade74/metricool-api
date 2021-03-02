create table providers (
	id int primary key,
	name varchar
);

create table organizations (
	id int primary key,
	name varchar,
	url varchar,
	provider_id int references providers (id)
);

create table projects (
	id int,
	name varchar,
	description varchar,
	url varchar,
	organization_id int references organizations(id),
	primary key (id, organization_id)
);

create table project_work_types (
	id int,
	name varchar,
	description varchar,
	project_id int,
	organization_id int,
	foreign key (project_id, organization_id) references projects (id, organization_id),
	primary key (id, project_id, organization_id)
);

create table project_stream_steps (
	id serial primary key,
	project_id int,
	organization_id int,
	name varchar,
	foreign key (project_id, organization_id) references projects (id, organization_id)
);

create table project_statuses (
	id int,
	project_id int,
	organization_id int,
	name varchar,
	foreign key (project_id, organization_id) references projects (id, organization_id),
	primary key (id, project_id, organization_id)
);

create table project_stream_steps_statuses (
	project_id int,
	organization_id int,
	step_id int,
	status_id int,
	foreign key (project_id, organization_id) references projects (id, organization_id),
	foreign key (step_id) references project_stream_steps (id),
	foreign key (status_id, project_id, organization_id) references project_statuses (id, project_id, organization_id)
);


