CREATE DATABASE autos;

USE autos;

CREATE TABLE models
(
	id      int auto_increment
		    primary key,
	model   varchar(255) not null,
	constraint models_model_uindex
		unique (model)
);

CREATE TABLE register
(
	id      int auto_inc rement
		    primary key,
	plates  varchar(40) not null,
	color   varchar(20) not null,
	model   int         not null,
	year    int         not null,
	lat     double      not null,
	lon     double      not null,
	constraint register_plates_uindex
		unique (plates),
	constraint register_models__fk
		foreign key (model) references models (id)
);
