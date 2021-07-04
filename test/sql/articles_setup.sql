DROP TABLE IF EXISTS `articles`;
CREATE TABLE articles
(
  id int
  unsigned NOT NULL AUTO_INCREMENT,
  name varchar
  (255),
  description varchar (255),
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON
  UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY
  (id)
);

insert into articles
    (name,description)
values
    ('article_1', 'description_1'),
    ('article_2', 'description_2');
