CREATE TABLE todo(
  todo_id SERIAL,
  task VARCHAR(255),
  description TEXT,
  status TEXT DEFAULT 'Todo',
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
)