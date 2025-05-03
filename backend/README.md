## Start the server (important)

Starts the server on localhost rather than 127.0.0.1.
```bash
flask run --host=localhost
```

### Seed database

Run the script:
```bash
sqlite3 ./instance/database.db < ./instance/setup.sql
```

Verify database tables
```bash
sqlite3 ./instance/database.db

.tables
```
