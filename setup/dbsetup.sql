drop table if exists mind_palace;
create table mind_palace (
  number int not null primary key,
  card varchar(15),
  person varchar(26),
  action varchar(26),
  object varchar(26),
  class varchar(15));
