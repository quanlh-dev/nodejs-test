-- Active: 1711961962882@@127.0.0.1@5432@mydatabase@public\

CREATE TYPE FieldType AS ENUM(
    'NumberFieldSpec',
    'StringFieldSpec'
);

CREATE TABLE fields (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "createdAt" TIME WITHOUT TIME ZONE DEFAULT CURRENT_TIME,
    "updatedAt" TIME WITHOUT TIME ZONE,
    "deletedAt" TIME WITHOUT TIME ZONE,
    "createdBy" INT,
    "updatedBy" INT,
    "deletedBy" INT,
    "name" VARCHAR(255) NOT NULL,
    "type" FieldType NOT NULL,
    "offsetFrom" INT NOT NULL DEFAULT 0,
    "offsetTo" INT NOT NULL DEFAULT 0,
    "description" VARCHAR(2000) NOT NULL
);