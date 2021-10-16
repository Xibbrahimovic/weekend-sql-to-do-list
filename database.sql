CREATE TABLE "tasks_table" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(100) NOT NULL,
    "due_date" date,
    "completed" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR(250)
);

INSERT INTO "tasks_table" 
("task", "due_date", "completed", "notes")
VAlUES
    ('Clean my room', '10-21-2021',	True, 'So much dust'),
    ('Rake the leaves', '10-28-2021' False,	'Fall is coming! Lots of colors'),
    ('Have dinner with parents', '10-30-2021', False, 'Its about time'),
    ('Finish Friday speech', '10-22-2021', False, 'Topic comes Thursday evening');
