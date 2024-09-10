-- Active: 1711961962882@@127.0.0.1@5432@mydatabase

CREATE TYPE FieldType AS ENUM(
    'NumberFieldSpec',
    'StringFieldSpec'
);

CREATE TABLE fields (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "type" FieldType NOT NULL,
    "offsetFrom" INT NOT NULL DEFAULT 0,
    "offsetTo" INT NOT NULL DEFAULT 0,
    "description" VARCHAR(2000) NOT NULL
);