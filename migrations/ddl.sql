create table users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	email varchar not null,
	password varchar not null
);

create table projects (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int not null,
	name varchar not null,
	key varchar not null,
	org varchar,
	unique (original_id, org)
);

create table boards (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int not null,
	name varchar not null,
	type varchar not null,
	project_id uuid,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
)

create table dashboards (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	login varchar,
	api_token varchar not null,
	name varchar not null,
	provider varchar not null,
	active bool not null default true,
	base_url varchar not null,
	user_id uuid,
	project_id uuid,
	board_id uuid,
	foreign key (user_id) references users (id),
	foreign key (project_id) references projects (id),
	foreign key (board_id) references boards (id)
);

create table project_work_types (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int,
	name varchar,
	description varchar,
	hierarchy_level smallint,
	project_id uuid,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
);

create table project_statuses (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	original_id int not null,
	name varchar not null,
	description varchar not null,
	category_name varchar not null,
	project_id uuid,
	foreign key (project_id) references projects (id),
	unique (original_id, project_id)
);
