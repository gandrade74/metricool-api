create table users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	email varchar not null,
	password varchar not null
);

create table dashboards (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	url varchar not null,
	login varchar,
	api_token varchar not null,
	project_id int not null,
	project_name varchar not null,
	board_id int not null,
	board_name varchar not null,
	alias varchar not null,
	provider varchar not null,
	active bool not null default true,
	user_id uuid,
	foreign key (user_id) references users (id)
);

create table project_work_types (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int,
	name varchar,
	description varchar,
	project_id uuid,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
);

create table project_stream_steps (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	project_id uuid,
	name varchar,
	foreign key (project_id) references projects (id)
);

create table project_statuses (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int,
	project_id uuid,
	name varchar,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
);

create table project_stream_steps_statuses (
	project_id uuid,
	step_id uuid,
	status_id uuid,
	foreign key (project_id) references projects (id),
	foreign key (step_id) references project_stream_steps (id),
	foreign key (status_id) references project_statuses (id)
);

create table project_issues (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int,
	key varchar,
	img varchar,
	summary varchar,
	project_id uuid,
	foreign key (project_id) references projects (id)
);

create table project_issues_status_history (
	issue_id uuid,
	status_from_id uuid,
	status_to_id uuid,
	updated_at timestamp,
	project_id uuid,
	foreign key (issue_id) references project_issues (id),
	foreign key (status_from_id) references project_issues (id),
	foreign key (status_to_id) references project_issues (id),
	foreign key (project_id) references projects (id)
);

create table import_history
(
	import_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	project_id uuid,
	started timestamp,
	completed timestamp,
	status varchar,
	message varchar,
	type varchar,
	foreign key (project_id) references projects (id)
);

create table stream_config (

)

create table project_boards (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name varchar,
	type varchar,
	original_id int,
	project_id uuid,
	foreign key (project_id) references projects (id)
)
