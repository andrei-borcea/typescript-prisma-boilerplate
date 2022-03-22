CREATE TABLE contact_requests (
	id SERIAL PRIMARY KEY,
	email varchar NOT NULL,
	subject varchar NOT NULL,
	message text NOT NULL
);