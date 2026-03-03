-- ISRO MISSION AND SATELLITE MANAGEMENT

--1.Rocket Table
CREATE TABLE Rocket (
    rocket_id serial PRIMARY KEY,
    rocket_name VARCHAR(100),
    type VARCHAR(50),
    capacity_kg INT,
    manufacturer VARCHAR(100)
);

--2. Launch_Site Table
CREATE TABLE Launch_Site (
    site_id serial PRIMARY KEY,
    site_name VARCHAR(100),
    location VARCHAR(100),
    country VARCHAR(50)
);

--3. Mission Table
CREATE TABLE Mission (
    mission_id serial PRIMARY KEY,
    mission_name VARCHAR(100),
    launch_date DATE,
    mission_type VARCHAR(50),
    status VARCHAR(30),
    rocket_id INT,
    site_id INT,
    FOREIGN KEY (rocket_id) REFERENCES Rocket(rocket_id),
    FOREIGN KEY (site_id) REFERENCES Launch_Site(site_id)
);

--4.Satellite Table
CREATE TABLE Satellite (
    satellite_id serial PRIMARY KEY,
    satellite_name VARCHAR(100),
    purpose VARCHAR(100),
    orbit_type VARCHAR(50),
    mission_id INT,
    weight_kg INT,
    FOREIGN KEY (mission_id) REFERENCES Mission(mission_id)
);

--5. Astronaut Table
CREATE TABLE Astronaut (
    astronaut_id serial PRIMARY KEY,
    name VARCHAR(100),
    role VARCHAR(50),
    nationality VARCHAR(50),
    mission_id INT,
    FOREIGN KEY (mission_id) REFERENCES Mission(mission_id)
);

--6. Scientist Table
CREATE TABLE Scientist (
    scientist_id serial PRIMARY KEY,
    name VARCHAR(100),
    designation VARCHAR(100),
    department VARCHAR(100),
    contact VARCHAR(50)
);

--7. Misssion_Scientist Table
CREATE TABLE Mission_Scientist (
    mission_id INT,
    scientist_id INT,
    mission_role VARCHAR(100),
    PRIMARY KEY (mission_id, scientist_id),
    FOREIGN KEY (mission_id) REFERENCES Mission(mission_id),
    FOREIGN KEY (scientist_id) REFERENCES Scientist(scientist_id)
);

INSERT INTO Rocket (rocket_name, type, capacity_kg, manufacturer)
VALUES ('PSLV-XL', 'PSLV', 1750, 'ISRO'),
('GSLV Mk-II', 'GSLV', 2490, 'ISRO'),
('GSLV Mk-III', 'Heavy Lift', 4000, 'ISRO'),
('SSLV', 'Mini LV', 500, 'ISRO');

INSERT INTO Launch_Site (site_name, location, country)
VALUES ('Satish Dhawan Space Centre', 'Sriharikota', 'India'),
('Thumba Equatorial Launch Station', 'Thiruvananthapuram', 'India');

INSERT INTO Mission (mission_name, launch_date, mission_type, status, rocket_id, site_id) VALUES
('Aryabhata Mission', '1975-04-19', 'Science', 'Completed', 1, 1),
('Bhaskara-I Mission', '1979-06-07', 'Earth Observation', 'Completed', 1, 1),
('Rohini RS-1', '1980-07-18', 'Technology', 'Completed', 1, 1),
('INSAT-1A Mission', '1982-04-10', 'Communication', 'Completed', 2, 1),
('INSAT-2A Mission', '1992-07-09', 'Communication', 'Completed', 2, 1),
('Chandrayaan-1', '2008-10-22', 'Lunar', 'Completed', 1, 1),
('Mangalyaan', '2013-11-05', 'Mars', 'Completed', 1, 1),
('Astrosat Mission', '2015-09-28', 'Astronomy', 'Completed', 1, 1),
('Cartosat-2C Mission', '2016-06-22', 'Earth Imaging', 'Completed', 1, 1),
('GSAT-19 Mission', '2017-06-05', 'Communication', 'Completed', 3, 1),
('Chandrayaan-2', '2019-07-22', 'Lunar', 'Completed', 3, 1),
('RISAT-2B Mission', '2019-05-22', 'Radar Imaging', 'Completed', 1, 1),
('EOS-01 Mission', '2020-11-07', 'Earth Observation', 'Completed', 1, 1),
('Amazonia-1 Mission', '2021-02-28', 'Earth Observation', 'Completed', 1, 1),
('SSLV-D2 Mission', '2023-02-10', 'Test', 'Completed', 4, 1),
('Chandrayaan-3', '2023-07-14', 'Lunar', 'Completed', 3, 1),
('Aditya-L1 Mission', '2023-09-02', 'Solar', 'Completed', 1, 1);


INSERT INTO Satellite (satellite_name, purpose, orbit_type, mission_id, weight_kg) VALUES
('Aryabhata', 'Technology Experiment', 'LEO', 1, 360),
('Bhaskara-I', 'Earth Observation', 'LEO', 2, 444),
('Rohini RS-1', 'Technology Demonstration', 'LEO', 3, 35),
('INSAT-1A', 'Communication', 'GEO', 4, 1200),
('INSAT-2A', 'Communication', 'GEO', 5, 1850),
('Chandrayaan-1 Orbiter', 'Lunar Mapping', 'Lunar Orbit', 6, 523),
('Mangalyaan Orbiter', 'Mars Study', 'Mars Orbit', 7, 1350),
('Astrosat', 'Astronomy Research', 'LEO', 8, 1513),
('Cartosat-2C', 'Earth Imaging', 'SSO', 9, 690),
('GSAT-19', 'Communication', 'GTO', 10, 3136),
('Chandrayaan-2 Orbiter', 'Lunar Study', 'Lunar Orbit', 11, 2379),
('RISAT-2B', 'Radar Imaging', 'LEO', 12, 615),
('EOS-01', 'Earth Observation', 'LEO', 13, 630),
('Amazonia-1', 'Earth Observation', 'LEO', 14, 637),
('SSLV-D2 Payload', 'Test Satellite', 'LEO', 15, 156),
('Chandrayaan-3 Lander', 'Lunar Landing', 'Lunar Orbit', 16, 1752),
('Aditya-L1', 'Solar Study', 'L1 Orbit', 17, 1480);


INSERT INTO Astronaut (name, role, nationality, mission_id) VALUES
('Rakesh Sharma', 'Commander', 'India', 1),
('Sunita Williams', 'Scientist-Astronaut', 'USA/India', 8),
('Kalpana Chawla', 'Mission Specialist', 'USA/India', 3);


INSERT INTO Scientist (name, designation, department, contact) VALUES
('Vikram Sarabhai', 'Chairman', 'Space Science', '9876543210'),
('APJ Abdul Kalam', 'Aerospace Engineer', 'Launch Vehicles', '9123456780'),
('K. Sivan', 'Chairman', 'ISRO', '9988776655'),
('S. Somnath', 'Chairman', 'ISRO', '9090909090');


INSERT INTO Mission_Scientist VALUES
(6, 1, 'Founder Vision'),
(7, 2, 'Lead Engineer'),
(16, 3, 'Program Director'),
(17, 4, 'Mission Head');


--Function 1: Calculate days left for launch
CREATE OR REPLACE FUNCTION mission_status(mid INT)
RETURNS TEXT AS $$
DECLARE
    d DATE;
BEGIN
    SELECT launch_date INTO d FROM mission WHERE mission_id = mid;

    IF d = CURRENT_DATE THEN
        RETURN 'Launching Today';
    ELSIF d > CURRENT_DATE THEN
        RETURN 'Upcoming Mission';
    ELSE
        RETURN 'Already Launched';
    END IF;
END;
$$ LANGUAGE plpgsql;

--Check status of mission with ID 
SELECT mission_status(302);

--Function 2: rocket efficiency
CREATE OR REPLACE FUNCTION rocket_efficiency(rid INT)
RETURNS NUMERIC AS $$
DECLARE
    cap INT;
    mission_count INT;
BEGIN
   
    SELECT capacity_kg INTO cap 
    FROM rocket 
    WHERE rocket_id = rid;
    
	SELECT COUNT(*) INTO mission_count
    FROM mission
    WHERE rocket_id = rid;

    IF mission_count = 0 THEN
        RETURN NULL; 
    END IF;

    RETURN ROUND(cap::NUMERIC / mission_count, 2);
END;
$$ LANGUAGE plpgsql;

-- Check efficiency of rocket with ID 
SELECT rocket_efficiency(101);


--Procedure 1: Assign a scientist to a mission
CREATE OR REPLACE PROCEDURE assign_scientist_to_mission(mid INT, sid INT, role VARCHAR)
LANGUAGE plpgsql AS $$
BEGIN
    -- Check if already assigned
    IF EXISTS (
        SELECT 1 
        FROM mission_scientist 
        WHERE mission_id = mid AND scientist_id = sid
    ) THEN
        RAISE NOTICE 'Scientist % is already assigned to Mission %', sid, mid;
    ELSE
        INSERT INTO mission_scientist(mission_id, scientist_id, mission_role)
        VALUES (mid, sid, role);
        RAISE NOTICE 'Scientist % assigned to Mission % as %', sid, mid, role;
    END IF;
END;
$$;
--call like this
CALL assign_scientist_to_mission(306, 601, 'Advisor');


--Procedure 2: Create a new rocket automatically for a mission
CREATE OR REPLACE PROCEDURE create_mission_rocket(mid INT, rtype VARCHAR, rcap INT, rmanuf VARCHAR)
LANGUAGE plpgsql AS $$
DECLARE
    new_id INT;
BEGIN
    SELECT COALESCE(MAX(rocket_id), 0) + 1 INTO new_id FROM rocket;

    INSERT INTO rocket(rocket_id, rocket_name, type, capacity_kg, manufacturer)
    VALUES (
        new_id,
        'Rocket_' || new_id || '_M' || mid,
        rtype,
        rcap,
        rmanuf
    );
    UPDATE mission
    SET rocket_id = new_id
    WHERE mission_id = mid;

    RAISE NOTICE 'Created Rocket % for Mission %', new_id, mid;
END;
$$;
--call like this
CALL create_mission_rocket(317, 'Heavy Lift', 4000, 'ISRO');

select * from Rocket;

--Cursor 1: List all missions
DO $$
DECLARE
    rec RECORD;
    cur CURSOR FOR 
        SELECT s.name, COUNT(ms.mission_id) AS mission_count
        FROM scientist s
        LEFT JOIN mission_scientist ms ON s.scientist_id = ms.scientist_id
        GROUP BY s.scientist_id, s.name;
BEGIN
    OPEN cur;
    LOOP
        FETCH cur INTO rec;
        EXIT WHEN NOT FOUND;
        RAISE NOTICE 'Scientist: % | Missions Assigned: %', rec.name, rec.mission_count;
    END LOOP;
END;
$$;

--Cursor 2: Show rocket details
DO $$
DECLARE
    r RECORD;
    rocket_cur CURSOR FOR 
        SELECT rocket_id, rocket_name, type, capacity_kg, manufacturer FROM Rocket;
BEGIN
    OPEN rocket_cur;
    LOOP
        FETCH rocket_cur INTO r;
        EXIT WHEN NOT FOUND;
        RAISE NOTICE 'Rocket ID: % | Name: % | Type: % | Capacity: % kg | Manufacturer: %', 
                     r.rocket_id, r.rocket_name, r.type, r.capacity_kg, r.manufacturer;
    END LOOP;
    CLOSE rocket_cur;
END;
$$;

--Trigger 1: Automatically update mission status
CREATE OR REPLACE FUNCTION update_mission_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.launch_date = CURRENT_DATE THEN
        NEW.status := 'Launching Today';
    ELSIF NEW.launch_date > CURRENT_DATE THEN
        NEW.status := 'Upcoming';
    ELSE
        NEW.status := 'Already Launched';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_mission_status
BEFORE INSERT OR UPDATE ON mission
FOR EACH ROW
EXECUTE FUNCTION update_mission_status();

--2.Trigger: Prevent assigning overweight satellites to rockets
CREATE OR REPLACE FUNCTION check_satellite_weight()
RETURNS TRIGGER AS $$
DECLARE
    rocket_cap INT;
BEGIN
    -- Get rocket capacity for the mission
    SELECT r.capacity_kg INTO rocket_cap
    FROM mission m
    JOIN rocket r ON m.rocket_id = r.rocket_id
    WHERE m.mission_id = NEW.mission_id;

    IF NEW.weight_kg > rocket_cap THEN
        RAISE EXCEPTION 'Satellite weight % exceeds rocket capacity %', NEW.weight_kg, rocket_cap;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_satellite_weight
BEFORE INSERT OR UPDATE ON satellite
FOR EACH ROW
EXECUTE FUNCTION check_satellite_weight();

--when we insert value that trigger will be call
INSERT INTO mission(mission_id, mission_name, launch_date, mission_type, rocket_id, site_id)
VALUES (318, 'Test Mission', CURRENT_DATE + 10, 'Science', 101, 201);

SELECT * FROM mission WHERE mission_id = 318;

----when we insert value that trigger will be call
INSERT INTO satellite(satellite_id, satellite_name, purpose, orbit_type, mission_id, weight_kg)
VALUES (418, 'Heavy Sat', 'Observation', 'LEO', 315, 600);


-- 1️.List all missions and their rockets (only name and type)
SELECT m.mission_name, r.rocket_name
FROM mission m
JOIN rocket r ON m.rocket_id = r.rocket_id
LIMIT 5;

-- 2️.List satellites of a specific mission (Chandrayaan-1)
SELECT s.satellite_name, s.orbit_type, s.weight_kg
FROM satellite s
JOIN mission m ON s.mission_id = m.mission_id
WHERE m.mission_name = 'Chandrayaan-1';

-- 3️.Show rocket capacity for a specific rocket (PSLV-XL)
SELECT rocket_name, capacity_kg
FROM rocket
WHERE rocket_name = 'PSLV-XL';

-- 4️.Count how many missions a rocket has launched (PSLV-XL)
SELECT r.rocket_name, COUNT(m.mission_id) AS total_missions
FROM rocket r
LEFT JOIN mission m ON r.rocket_id = m.rocket_id
WHERE r.rocket_name = 'PSLV-XL'
GROUP BY r.rocket_name;

-- 5️.List scientists and their missions (only first 3)
SELECT s.name AS scientist, m.mission_name
FROM scientist s
JOIN mission_scientist ms ON s.scientist_id = ms.scientist_id
JOIN mission m ON ms.mission_id = m.mission_id
LIMIT 3;

-- 6️.Upcoming missions within next 30 days
SELECT mission_name, launch_date, status
FROM mission
WHERE launch_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days';

-- 7️.Heaviest satellite in Chandrayaan-2 mission
SELECT s.satellite_name, s.weight_kg
FROM satellite s
JOIN mission m ON s.mission_id = m.mission_id
WHERE m.mission_name = 'Chandrayaan-2'
ORDER BY s.weight_kg DESC
LIMIT 1;

-- 8️.Total satellite weight of Chandrayaan-3
SELECT m.mission_name, SUM(s.weight_kg) AS total_weight_kg
FROM mission m
JOIN satellite s ON m.mission_id = s.mission_id
WHERE m.mission_name = 'Chandrayaan-3'
GROUP BY m.mission_name;

-- 9️.Missions where total satellite weight exceeds 1500 kg
SELECT m.mission_name, SUM(s.weight_kg) AS total_sat_weight
FROM mission m
JOIN satellite s ON m.mission_id = s.mission_id
GROUP BY m.mission_name
HAVING SUM(s.weight_kg) > 1500;

-- 10️. Transaction: Add a new mission with satellite and scientist
BEGIN;
INSERT INTO mission (mission_id, mission_name, launch_date, mission_type, status, rocket_id, site_id)
VALUES (319, 'Test Lunar Mission', CURRENT_DATE + INTERVAL '15 days', 'Lunar', 'Upcoming', 103, 201);

INSERT INTO satellite (satellite_id, satellite_name, purpose, orbit_type, mission_id, weight_kg)
VALUES (418, 'Test Lunar Orbiter', 'Lunar Mapping', 'Lunar Orbit', 319, 1200);

INSERT INTO mission_scientist (mission_id, scientist_id, mission_role)
VALUES (319, 604, 'Mission Specialist');

COMMIT;
SELECT * FROM MISSION;
select * from satellite;
select * from mission_scientist;

