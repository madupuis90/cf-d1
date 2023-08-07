-- Migration number: 0000 	 2023-08-04T22:18:35.956Z
create table users (
  name  varchar2
);

insert into users (name) values ('bob');