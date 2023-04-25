CREATE TABLE IF NOT EXISTS majors (
    major_id             SERIAL              NOT NULL,
    major_name      VARCHAR(1024)       NULL,
    CONSTRAINT pk_majors PRIMARY KEY ( major_id )
);

INSERT INTO majors( major_name )
VALUES 
('Bac Sciences mathmatiques A'),
('Bac Sciences Mathematiques B'),
('Bac Sciences Physiques'),
('Sciences de la Chariaa'),
('Langue Arabe'),
('BAC SCIENCES AGRONOMIQUES'),
('BAC SCIENCES ECONOMIQUES'),
('BAC TECHNIQUES DE GESTION ET COMPTABILITE'),
('BAC SVT'),
('BAC Lettres'),
('Arts appliques'),
('Bac Sciences et Technologies Mecaniques'),
('Bac Sciences et Technologies Electriques'),
('Sciences humaines');


CREATE TABLE IF NOT EXISTS subjects (
    subject_id             SERIAL              NOT NULL,
    subject_name      VARCHAR(1024)       NULL,
    CONSTRAINT pk_subjects PRIMARY KEY (subject_id)
);




INSERT INTO subjects( subject_name )
VALUES 
('Mathmatiques'),
('English'),
('Physiques'),
('Tawtiq'),
('Arabe'),
('Sciences des Plantes et Animaux	'),
('SVT'),
('Comptabilite et mathematiques financieres	'),
('Arts'),
('Mecaniques'),
('Electriques'),
('Francais'),
('Education Islamique'),
('Histoire geographie'),
('Philosophie'),
('Education physique'),
('Assiduite'),
('Traduction'),
('Economie generale et statistiques'),
('Economie et organisation  des entreprises'),
('Droit'),
('Informatique de gestion'),
('Tafssir wa Hadith'),
('Science ingenieure');


CREATE TABLE IF NOT EXISTS filieres (
    filiere_id             SERIAL              NOT NULL,
    filiere_name      VARCHAR(1024)       NULL,
    CONSTRAINT pk_filieres PRIMARY KEY (filiere_id)
);

INSERT INTO filieres( filiere_name )
VALUES
    ('smi'),
    ('sma'),
    ('smpc');

CREATE TABLE IF NOT EXISTS regles (
    regle_id              SERIAL               not null,
    major_id                  INT4                 not null,
    filiere_id                INT4                 not null,
    Mathmatiques         CHAR(10)             null,
    Physiques            CHAR(10)             null,
    Result                  CHAR(10)          null,
    CONSTRAINT pk_regles PRIMARY KEY (regle_id)
);



INSERT INTO regles (major_id,filiere_id,Mathmatiques,Physiques,Result)
VALUES
(1,1,'Bien','Bien','Bien'),
(1,1,'Bien','Moyen'	,'A.Bien'),
(1,1,'Bien','Faible','Moyen'),
(1,1,'Moyen','Bien','Moyen'),
(1,1,'Moyen','Moyen','Faible'),
(1,1,'Moyen','Faible','Faible'),
(1,1,'Faible','Bien','Faible'),
(1,1,'Faible','Moyen','Null'),
(1,1,'Faible','Faible','Null'),


(2,1,'Bien','Bien','Bien'),
(2,1,'Bien','Moyen'	,'A.Bien'),
(2,1,'Bien','Faible','Moyen'),
(2,1,'Moyen','Bien','Moyen'),
(2,1,'Moyen','Moyen','Faible'),
(2,1,'Moyen','Faible','Faible'),
(2,1,'Faible','Bien','Faible'),
(2,1,'Faible','Moyen','Null'),
(2,1,'Faible','Faible','Null'),


(3,1,'Bien','Bien','Bien'),
(3,1,'Bien','Moyen'	,'A.Bien'),
(3,1,'Bien','Faible','Moyen'),
(3,1,'Moyen','Bien','Moyen'),
(3,1,'Moyen','Moyen','Faible'),
(3,1,'Moyen','Faible','Faible'),
(3,1,'Faible','Bien','Faible'),
(3,1,'Faible','Moyen','Null'),
(3,1,'Faible','Faible','Null'),

(1,2,'Bien','Bien','Bien'),
(1,2,'Bien','Moyen','A.Bien'),
(1,2,'Bien','Faible','Moyen'),
(1,2,'Moyen','Bien','Faible'),
(1,2,'Moyen','Moyen','Faible'),
(1,2,'Moyen','Faible','Faible'),
(1,2,'Faible','Bien','Faible'),
(1,2,'Faible','Moyen','Null'),
(1,2,'Faible','Faible','Null'),


(2,2,'Bien','Bien','Bien'),
(2,2,'Bien','Moyen','A.Bien'),
(2,2,'Bien','Faible','Moyen'),
(2,2,'Moyen','Bien','Faible'),
(2,2,'Moyen','Moyen','Faible'),
(2,2,'Moyen','Faible','Faible'),
(2,2,'Faible','Bien','Faible'),
(2,2,'Faible','Moyen','Null'),
(2,2,'Faible','Faible','Null'),


(2,3,'Bien','Bien','Bien'),
(2,3,'Bien','Moyen','A.Bien'),
(2,3,'Bien','Faible','Moyen'),
(2,3,'Moyen','Bien','Faible'),
(2,3,'Moyen','Moyen','Faible'),
(2,3,'Moyen','Faible','Faible'),
(2,3,'Faible','Bien','Faible'),
(2,3,'Faible','Moyen','Null'),
(2,3,'Faible','Faible','Null'),

(3,1,'Bien','Bien','Bien'),
(3,1,'Bien','Moyen','A.Bien'),
(3,1,'Bien','Faible','Faible'),
(3,1,'Moyen','Bien','A.Bien'),
(3,1,'Moyen','Moyen','Moyen'),
(3,1,'Moyen','Faible','Faible'),
(3,1,'Faible','Bien','Moyen'),
(3,1,'Faible','Moyen','Faible'),
(3,1,'Faible','Faible','Null'),


(3,2,'Bien','Bien','Bien'),
(3,2,'Bien','Moyen','A.Bien'),
(3,2,'Bien','Faible','Faible'),
(3,2,'Moyen','Bien','A.Bien'),
(3,2,'Moyen','Moyen','Moyen'),
(3,2,'Moyen','Faible','Faible'),
(3,2,'Faible','Bien','Moyen'),
(3,2,'Faible','Moyen','Faible' ),
(3,2,'Faible','Faible','Null' ),


(3,3,'Bien','Bien','Bien' ),
(3,3,'Bien','Moyen','A.Bien' ),
(3,3,'Bien','Faible','Faible' ),
(3,3,'Moyen','Bien','A.Bien' ),
(3,3,'Moyen','Moyen','Moyen' ),
(3,3,'Moyen','Faible','Faible' ),
(3,3,'Faible','Bien','Moyen' ),
(3,3,'Faible','Moyen','Faible' ),
(3,3,'Faible','Faible','Null' );

CREATE TABLE IF NOT EXISTS exams (
    major_id                  INT4                 not null,
    subject_id                INT4                 not null,
    coeff                INT2                 null,
    CONSTRAINT pk_exams PRIMARY KEY (major_id,subject_id)
);

INSERT INTO exams (major_id, subject_id, coeff) VALUES
(1, 1, 9),
(1, 3, 7),
(1, 2, 2),
(1, 15, 2),
(1, 7, 3),

(2, 1, 9),
(2, 3, 7),
(2, 2, 2),
(2, 15, 2),
(2, 24, 3),

(3, 1, 7),
(3, 3, 7),
(3, 7, 5),
(3, 2, 2),
(3, 15, 2);




/*==============================================================*/
/* Table : MARK                                                 */
/*==============================================================*/
create table mark (
   username             CHAR(255)            not null,
   subject_id                INT4                 not null,
   note                 INT4                 null,
   constraint PK_MARK primary key (username, subject_id)
);




create table student (
   username             CHAR(255)            not null,
   major_id                  INT4                 not null,
   first_name           CHAR(50)             null,
   last_name            CHAR(50)             null,
   password             VARCHAR(1024)        null,
   constraint PK_STUDENT primary key (username)
);



alter table mark
   add constraint FK_MARK_MARK_SUBJECTS foreign key (subject_id)
      references subjects (subject_id)
      on delete restrict on update restrict;


alter table mark
   add constraint FK_MARK_MARK2_STUDENT foreign key (username)
      references student (username)
      on delete restrict on update restrict;


alter table student
   add constraint FK_STUDENT_STUDY_MAJOR foreign key (major_id)
      references majors (major_id)
      on delete restrict on update restrict;


alter table exams
   add constraint FK_EXAM_EXAM_SUBJECTS foreign key (subject_id)
      references subjects (subject_id)
      on delete restrict on update restrict;



alter table exams
   add constraint FK_EXAM_EXAM2_MAJOR foreign key (major_id)
      references majors (major_id)
      on delete restrict on update restrict;



alter table regles
   add constraint FK_REGLE_SMIA_MAJOR foreign key (major_id)
      references majors (major_id)
      on delete restrict on update restrict;


alter table regles
   add constraint FK_REGLE_FILIERE foreign key (filiere_id)
      references filieres (filiere_id)
      on delete restrict on update restrict;

