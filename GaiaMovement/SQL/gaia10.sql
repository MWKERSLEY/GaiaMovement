alter table Useful
add xgal float;
alter table Useful
add ygal float;
alter table Useful
add zgal float;

alter table Useful
add uxgal float;
alter table Useful
add uygal float;
alter table Useful
add uzgal float;

alter table Useful
add xICRS float;
alter table Useful
add yICRS float;
alter table Useful
add zICRS float;

alter table Useful
add xICRS2 float;
alter table Useful
add yICRS2 float;
alter table Useful
add zICRS2 float;

alter table Useful
add uICRSx float;
alter table Useful
add uICRSy float;
alter table Useful
add uICRSz float;

alter table Useful
add px float;
alter table Useful
add py float;
alter table Useful
add pz float;

alter table Useful
add naiveDistance float;

alter table Useful
add uICRSxd float;
alter table Useful
add uICRSyd float;
alter table Useful
add uICRSzd float;

alter table Useful
add Vt float;

alter table Useful
add V float;

alter table Useful
add uICRSxvt float;
alter table Useful
add uICRSyvt float;
alter table Useful
add uICRSzvt float;

alter table Useful
add vrx float;
alter table Useful
add vry float;
alter table Useful
add vrz float;

alter table Useful
add vx float;
alter table Useful
add vy float;
alter table Useful
add vz float;


alter table Useful
add ID int;

GO

delete from Useful
where parallax is NULL OR Cast(parallax as float) = 0;

Go

--Update Useful
--SET ID = 1;

--UPDATE Useful
--SET xgal = cos(Cast(l as float))*cos(Cast(b as float));
--UPDATE Useful
--SET ygal = sin(Cast(l as float))*cos(Cast(b as float));
--UPDATE Useful
--SET zgal = sin(Cast(b as float));

--UPDATE Useful
--SET xICRS = (-0.05487556042*xgal + 0.4941094279*ygal -0.867666149*zgal);
--UPDATE Useful
--SET yICRS = (-0.8734370902*xgal - 0.44482963*ygal - 0.1980763734*zgal);
--UPDATE Useful
--SET zICRS = (-0.4838350155*xgal + 0.7469822445*ygal + 0.4559837762*zgal);


UPDATE Useful
SET xgal = cos(Cast(l as float)*PI()/180)*cos(Cast(b as float)*PI()/180);
UPDATE Useful
SET ygal = sin(Cast(l as float)*PI()/180)*cos(Cast(b as float)*PI()/180);
UPDATE Useful
SET zgal = sin(Cast(b as float)*PI()/180);


UPDATE Useful
SET uICRSx = -sin(ra*PI()/180)*pmra-cos(ra*PI()/180)*sin(dec*PI()/180)*pmdec;
UPDATE Useful
SET uICRSy = cos(ra*PI()/180)*pmra-sin(ra*PI()/180)*sin(dec*PI()/180)*pmdec;
UPDATE Useful
SET uICRSz = cos(dec*PI()/180)*pmdec;

go

Update Useful
set uxgal = ((-0.0548755604162154)*uICRSx) +((-0.8734370902348850)*uICRSy) +((-0.4838350155487132)*uICRSz);
Update Useful 
set uygal = ((0.4941094278755837)*uICRSx) +((-0.4448296299600112)*uICRSy) +((0.7469822444972189)*uICRSz);
Update Useful
set uzgal = ((-0.8676661490190047)*uICRSx) +((-0.1980763734312015)*uICRSy) +((0.4559837761750669)*uICRSz);


UPDATE Useful
SET naiveDistance = 1000/CAST(parallax as float);

UPDATE Useful
SET px = xgal*naiveDistance;
UPDATE Useful
SET py = ygal*naiveDistance;
UPDATE Useful
SET pz = zgal*naiveDistance;

--UPDATE Useful
--SET uICRSxd = uICRSx * naiveDistance * 308600000 / 31557600;
--UPDATE Useful
--SET uICRSyd = uICRSy * naiveDistance * 308600000 / 31557600;
--UPDATE Useful
--SET uICRSzd = uICRSz * naiveDistance * 308600000 / 31557600;

UPDATE Useful
SET Vt = SQRT(CAST(pmra as float)*CAST(pmra as float)+CAST(pmdec as float)*CAST(pmdec as float))*naiveDistance*0.0047657357;
--((2*PI()*31000000000000)/(3600*1000*360*365*24*3600));

UPDATE Useful
SET V = SQRT(CAST(Vt as float)*CAST(Vt as float)+CAST(radial_velocity as float)*CAST(radial_velocity as float));
 
--UPDATE Useful
--SET uICRSxvt = Vt*uICRSx/SQRT(uICRSx*uICRSx+uICRSy*uICRSy+uICRSz*uICRSz);
--UPDATE Useful
--SET uICRSyvt = Vt*uICRSy/SQRT(uICRSx*uICRSx+uICRSy*uICRSy+uICRSz*uICRSz);
--UPDATE Useful
--SET uICRSzvt = Vt*uICRSz/SQRT(uICRSx*uICRSx+uICRSy*uICRSy+uICRSz*uICRSz);
 
--UPDATE Useful
--SET vrx = xICRS*radial_velocity;
--UPDATE Useful
--SET vry = yICRS*radial_velocity;
--UPDATE Useful
--SET vrz = zICRS*radial_velocity;

UPDATE Useful
SET vx = xgal*radial_velocity + Vt*uxgal/SQRT(uxgal*uxgal+uygal*uygal+uzgal*uzgal);
UPDATE Useful
SET vy = ygal*radial_velocity + Vt*uygal/SQRT(uxgal*uxgal+uygal*uygal+uzgal*uzgal);
UPDATE Useful
SET vz = zgal*radial_velocity + Vt*uzgal/SQRT(uxgal*uxgal+uygal*uygal+uzgal*uzgal);


--WITH RowNbrs AS (select source_id, ROW_NUMBER() over (Order by ID) AS RowNbr
--    FROM    Useful
--)
--UPDATE  Useful
--SET     Useful.ID =  RowNbr
--FROM    Useful
--        JOIN RowNbrs r ON Useful.source_id = r.source_id;

with T as (select ROW_NUMBER() over (order by cast(source_id as float) ASC) as RN
, ID
from Useful)
update T
set ID = RN;