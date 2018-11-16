SET @userId = 'ea2242d0-814a-47f0-9ebb-abce3be65f2e';
SET @systemAdminRoleId = '458fb0eb-af67-4b92-8585-0d24d329a660';
-- pwd: 123456
INSERT INTO users (id, createdAt, name, email, password, isExternalUser) VALUES (@userId, CURRENT_TIMESTAMP(), 'System Admin', 'admin@onion.com', '$2a$10$x1Dez7Gkof8fIVOLo9F36uWuteGCoqUa11AUYFgAmmKtdmFqTni9S', false);

INSERT INTO roles (id, createdAt, name, description ) VALUES (@systemAdminRoleId, CURRENT_TIMESTAMP(), 'System Admin', 'System Admin description');
INSERT INTO roles (id, createdAt, name, description) VALUES ('2259f52d-3e4b-401f-b1fe-c6bfdff61766', CURRENT_TIMESTAMP(), 'Admin', 'Admin description');
INSERT INTO roles (id, createdAt, name, description) VALUES ('e3998888-5a8a-4a07-bd02-b33de356614d', CURRENT_TIMESTAMP(), 'Advisor', 'Advisor description');
INSERT INTO roles (id, createdAt, name, description) VALUES ('d2b6730c-987d-4fc6-8788-358c9758bf04', CURRENT_TIMESTAMP(), 'Customer', 'Customer description');

INSERT INTO userroles (id, createdAt, roleId, userId) VALUES (UUID(), CURRENT_TIMESTAMP(), @systemAdminRoleId, @userId);
