drop table if exists mind_palace;
create table mind_palace (
  number int not null primary key,
  card varchar(15),
  person varchar(25),
  action varchar(25),
  object varchar(25),
  class varchar(15));
