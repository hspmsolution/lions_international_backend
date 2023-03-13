import connection from "../config/dbconnection.js";
const db = connection();

export const getActivity = async (req, res) => {
  try {
    const sql = "SELECT distinct type FROM activitytype";
    const data = await db.promise().query(sql);
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getSubtype = async (req, res) => {
  try {
    const { type } = req.query; 
    const sql = `SELECT DISTINCT subtype FROM activitytype WHERE type = ?`;
    const [data] = await 
    db.promise().query(sql, [type]);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { subtype } = req.query;
    const sql = `SELECT DISTINCT category FROM activitytype WHERE subtype = ?`;
    const [data] = await db.promise().query(sql, [subtype]);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const addActivity = async (req, res) => {
  const {
    amount,
    activityTitle,
    city,
    date,
    cabinetOfficers,
    description,
    lionHours,
    mediaCoverage,
    peopleServed,
    activityType,
    activitySubType,
    activityCategory,
    place,
    authorId,
    clubId
  } = req.body;
  try {
    await db.promise().query(
      "INSERT INTO activities SET ?",
      {
        amount,
        activityTitle,
        city,
        date,
        cabinetOfficers,
        description,
        lionHours,
        mediaCoverage,
        peopleServed,
        activityType,
        activitySubType,
        activityCategory,
        place,authorId,
        clubId
      }
    );
   
    return res.status(200).json({ successMessage: "Activity submitted" });
   
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};