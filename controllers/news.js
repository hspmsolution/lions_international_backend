import connection from "../config/dbconnection.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { uniqueName, writeFile } from "../utils/index.js";
const db = await connection();

const __dirname = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")
);

export const reportedNews = async (req, res) => {
  const clubId = req.clubId;
  try {
    const sql = "SELECT * FROM news WHERE clubId=?";
    const data = await db.promise().query(sql, [clubId]);

    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const newsReporting = async (req, res) => {
  const clubId = req.clubId;
  const authorId = req.userId;
  const verified = 0;
  const { newsTitle, newsPaperLink, date, description, image } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "image is required" });
    }
    const fileName = uniqueName(req.file.originalname);
    const imagePath = `/images/news/${fileName}`;
    const folder = path.resolve(__dirname, "..") + imagePath;
    await writeFile(folder, req.file.buffer);

    const sql =
      "INSERT INTO news (clubId, authorId, verified, newsTitle, newsPaperLink, date, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await db
      .promise()
      .query(sql, [
        clubId,
        authorId,
        verified,
        newsTitle,
        newsPaperLink,
        date,
        description,
        imagePath,
      ]);
    return res
      .status(200)
      .json({ successMessage: "News inserted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const topNews = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const rowsPerPage = 9;
    const offset = (page - 1) * rowsPerPage;

    // change verfied to 1 when testing is done
    const countSql = "SELECT COUNT(*) as count FROM news WHERE verified=0";
    const countData = await db.promise().query(countSql);
    const totalCount = countData[0][0].count;

    // change verfied to 1 when testing is done
    const sql = `SELECT newsId,newsTitle ,description , newsPaperLink,image,date FROM news WHERE verified=0 ORDER BY date DESC LIMIT ${rowsPerPage} OFFSET ${offset}`;
    const data = await db.promise().query(sql);

    return res.status(200).json({
      data: data[0],
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / rowsPerPage),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteNews = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).json({ message: "id param is required" });
    }
    const sql = `DELETE FROM news WHERE newsId = ?`;
    const [result] = await db.promise().query(sql, [id]);

    if (result.affectedRows === 1) {
      return res
        .status(200)
        .json({ successMessage: "News deleted successfully" });
    } else {
      return res.status(404).json({ message: "News not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
