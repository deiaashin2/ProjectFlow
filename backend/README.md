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
