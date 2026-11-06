const fs = require("fs");
const csv = require("csv-parser");
const Item = require("../modals/Item");



const toCamelCase = (header) => {
  return header
    .replace(/^\uFEFF/, "")
    .trim()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
};

const uploadCsvController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a CSV file",
      });
    }

    const items = [];

    fs.createReadStream(req.file.path)
      .pipe(
        csv({
          mapHeaders: ({ header }) => {
            if (!header || !header.trim()) return null;

            return toCamelCase(header);
          },
        })
      )
      .on("data", (row) => {
        // Keep all values as received from the CSV.
        const hasData = Object.values(row).some(
          (value) => String(value ?? "").trim() !== ""
        );

        if (hasData) {
          items.push(row);
        }
      })
      .on("end", async () => {
        try {
          if (!items.length) {
            fs.unlinkSync(req.file.path);

            return res.status(400).json({
              message: "No data found in CSV",
            });
          }

          const result = await Item.insertMany(items);

          fs.unlinkSync(req.file.path);

          return res.status(201).json({
            message: "CSV uploaded successfully",
            totalRecords: result.length,
            columns: Object.keys(items[0]),
            data: result,
          });
        } catch (error) {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }

          return res.status(500).json({
            message: error.message,
          });
        }
      })
      .on("error", (error) => {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
          message: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCsvDataController = async (req, res) => {
    try {
        const items = await Item.find().lean();

        if (!items.length) {
            return res.status(404).json({
                message: "No CSV data found",
            });
        }

        const excludedColumns = [
            "_id",
            "__v",
            "createdAt",
            "updatedAt",
        ];

        // Remove excluded fields from every record
        const data = items.map((item) => {
            const filteredItem = { ...item };

            excludedColumns.forEach((column) => {
                delete filteredItem[column];
            });

            return filteredItem;
        });

        // Get all remaining columns
        const allColumns = [
            ...new Set(
                data.flatMap((item) => Object.keys(item))
            ),
        ];

        const dataColumns = [];
        const emptyColumns = [];

        // Check whether each column contains any data
        for (const column of allColumns) {
            const hasData = data.some((item) => {
                const value = item[column];

                return (
                    value !== null &&
                    value !== undefined &&
                    String(value).trim() !== ""
                );
            });

            if (hasData) {
                dataColumns.push(column);
            } else {
                emptyColumns.push(column);
            }
        }

        return res.status(200).json({
            message: "CSV data fetched successfully",

            columns: {
                dataColumns,
                emptyColumns,
            },

            totalRecords: data.length,
            data,
        });
    } catch (error) {
        console.error("Get CSV data error:", error);

        return res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
  uploadCsvController,
  getCsvDataController,
};

 