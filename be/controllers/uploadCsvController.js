const fs = require("fs");
const csv = require("csv-parser");
const Item = require("../modals/Item");
const { randomUUID } = require("crypto");



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
// const getCsvDataController = async (req, res) => {
//     try {
//         const items = await Item.find().lean();

//         if (!items.length) {
//             return res.status(404).json({
//                 message: "No CSV data found",
//             });
//         }

//         const excludedColumns = ["_id", "__v"];

//         const allColumns = [
//             ...new Set(
//                 items.flatMap((item) => Object.keys(item))
//             ),
//         ].filter((column) => !excludedColumns.includes(column));

//         const dataColumns = [];
//         const emptyColumns = [];

//         for (const column of allColumns) {
//             const hasData = items.some((item) => {
//                 const value = item[column];

//                 return (
//                     value !== null &&
//                     value !== undefined &&
//                     String(value).trim() !== ""
//                 );
//             });

//             if (hasData) {
//                 dataColumns.push(column);
//             } else {
//                 emptyColumns.push(column);
//             }
//         }

//         return res.status(200).json({
//             message: "CSV data fetched successfully",

//             columns: {
//                 dataColumns,
//                 emptyColumns,
//             },

//             totalRecords: items.length,
//             data: items,
//         });
//     } catch (error) {
//         console.error("Get CSV data error:", error);

//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// };





module.exports = {
  uploadCsvController,
  getCsvDataController,
};

 


// const uploadCsvController = async (req, res) => {
//   let filePath;

//   try {
//     // 1. Check uploaded file
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload a CSV file",
//       });
//     }

//     filePath = req.file.path;

//     const csvData = [];

//     // 2. Expected CSV columns
//     const expectedColumns = [
//         "Item name*",
//         "Item code",
//         "Category",
//         "HSN",
//         "Sale price",
//         "Purchase price",
//         "Discount Type",
//         "Sale Discount",
//         "Opening stock quantity",
//         "Minimum stock quantity",
//         "Item Location",
//         "Tax Rate",
//         "Inclusive Of Tax",
//         "Base Unit (x)",
//         "Secondary Unit (y)",
//         "Conversion Rate (n)(x=ny)"
//     ];
//     // const expectedColumns = [
//     //   "item name*",
//     //   "item code",
//     //   "category",
//     //   "hsn",
//     //   "sale price",
//     //   "purchase price",
//     //   "discount type",
//     //   "sale discount",
//     //   "opening stock quantity",
//     //   "minimum stock quantity",
//     //   "item location",
//     //   "tax rate",
//     //   "inclusive of tax",
//     //   "base unit (x)",
//     //   "secondary unit (y)",
//     //   "conversion rate (n) (x = ny)",
//     // ];

//     // 3. Read CSV
//     await new Promise((resolve, reject) => {
//       let headersValidated = false;

//       fs.createReadStream(filePath)
//         .pipe(
//           csv({
//             mapHeaders: ({ header }) =>
//               header
//                 .replace(/^\uFEFF/, "")
//                 .trim()
//                 .toLowerCase(),
//             skipLines: 0,
//           })
//         )
//         .on("headers", (headers) => {
//           const missingColumns = expectedColumns.filter(
//             (column) => !headers.includes(column)
//           );

//           if (missingColumns.length > 0) {
//             return reject(
//               new Error(
//                 `Missing CSV columns: ${missingColumns.join(", ")}`
//               )
//             );
//           }

//           headersValidated = true;
//         })
//         .on("data", (row) => {
//           csvData.push(row);
//         })
//         .on("end", () => {
//           if (!headersValidated) {
//             return reject(new Error("Invalid or empty CSV file"));
//           }

//           resolve();
//         })
//         .on("error", reject);
//     });

//     // 4. Check empty CSV
//     if (csvData.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "CSV file contains no records",
//       });
//     }

//     // 5. Convert CSV values into MongoDB documents
//     const parseNumber = (value, field, rowNumber, required = false) => {
//       const cleanedValue = String(value ?? "").trim();

//       if (!cleanedValue) {
//         if (required) {
//           throw new Error(
//             `Row ${rowNumber}: ${field} is required`
//           );
//         }

//         return 0;
//       }

//       const number = Number(cleanedValue);

//       if (!Number.isFinite(number)) {
//         throw new Error(
//           `Row ${rowNumber}: Invalid number in ${field}`
//         );
//       }

//       return number;
//     };

//     const parseBoolean = (value, field, rowNumber) => {
//       const normalized = String(value ?? "").trim().toLowerCase();

//       if (["yes", "true", "1"].includes(normalized)) {
//         return true;
//       }

//       if (["no", "false", "0", ""].includes(normalized)) {
//         return false;
//       }

//       throw new Error(
//         `Row ${rowNumber}: Invalid boolean value in ${field}`
//       );
//     };

//     const items = csvData.map((row, index) => {
//       const rowNumber = index + 2;

//       const itemName = row["item name*"]?.trim();
//       const itemCode = row["item code"]?.trim();
//       const basicUnit = row["basic unit (x)"]?.trim();

//       if (!itemName || !itemCode || !basicUnit) {
//         throw new Error(
//           `Row ${rowNumber}: Item name, Item code and Basic Unit are required`
//         );
//       }

//       const discountType = row["discount type"]?.trim();

//       if (
//         discountType &&
//         !["percentage", "fixed"].includes(discountType.toLowerCase())
//       ) {
//         throw new Error(
//           `Row ${rowNumber}: Discount Type must be Percentage or Fixed`
//         );
//       }

//       const conversionRate = parseNumber(
//         row["conversion rate (n)(x=ny)"],
//         "Conversion Rate",
//         rowNumber
//       );

//       if (conversionRate < 0) {
//         throw new Error(
//           `Row ${rowNumber}: Conversion Rate cannot be negative`
//         );
//       }

//       return {
//         itemName,
//         itemCode,
//         category: row["category"]?.trim() || "",
//         hsn: row["hsn"]?.trim() || "",

//         salePrice: parseNumber(
//           row["sale price"],
//           "Sale Price",
//           rowNumber,
//           true
//         ),

//         purchasePrice: parseNumber(
//           row["purchase price"],
//           "Purchase Price",
//           rowNumber,
//           true
//         ),

//         discountType: discountType
//           ? discountType.toLowerCase() === "percentage"
//             ? "Percentage"
//             : "Fixed"
//           : "",

//         saleDiscount: parseNumber(
//           row["sale discount"],
//           "Sale Discount",
//           rowNumber
//         ),

//         openingStockQuantity: parseNumber(
//           row["opening stock quantity"],
//           "Opening Stock Quantity",
//           rowNumber
//         ),

//         minimumStockQuantity: parseNumber(
//           row["minimum stock quantity"],
//           "Minimum Stock Quantity",
//           rowNumber
//         ),

//         itemLocation: row["item location"]?.trim() || "",

//         taxRate: parseNumber(
//           row["tax rate"],
//           "Tax Rate",
//           rowNumber
//         ),

//         inclusiveOfTax: parseBoolean(
//           row["inclusive of tax"],
//           "Inclusive Of Tax",
//           rowNumber
//         ),

//         basicUnit,

//         secondaryUnit: row["secondary unit (y)"]?.trim() || "",

//         conversionRate: conversionRate || 1,
//       };
//     });

//     // 6. Store documents in MongoDB
//     const insertedItems = await Item.insertMany(items, {
//       ordered: true,
//     });

//     // 7. Success response
//     return res.status(201).json({
//       success: true,
//       message: "CSV data uploaded successfully",
//       totalRecords: insertedItems.length,
//       data: insertedItems,
//     });

//   } catch (error) {
//     console.error("CSV Upload Error:", error);

//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Duplicate item code found. Please check your CSV.",
//       });
//     }

//     return res.status(400).json({
//       success: false,
//       message: error.message || "Failed to upload CSV data",
//     });

//   } finally {
//     // 8. Delete temporary uploaded file
//     if (filePath) {
//       try {
//         await fs.promises.unlink(filePath);
//       } catch (error) {
//         console.error("Temporary file deletion error:", error.message);
//       }
//     }
//   }
// };


// module.exports = {
//   uploadCsvController,
// };

