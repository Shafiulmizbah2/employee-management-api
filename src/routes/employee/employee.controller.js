const db = require("../../db");

//get all employee
async function getAllEmployee(req, res) {
  let query = "SELECT * FROM employee";
  db.query(query, (err, rows, fields) => {
    if (!err) {
      return res.status(200).json(rows);
    } else {
      return res.status(500).json({ error: err.sqlMessage });
    }
  });
}

//get single employee
async function getEmployee(req, res) {
  let query = `SELECT * FROM employee WHERE empId =${req.params.id}`;
  db.query(query, (err, rows, fields) => {
    if (!err) {
      if (rows.length !== 0) {
        return res.status(200).json(rows[0]);
      }
      return res.status(500).json({ error: "No employee found!" });
    } else {
      return res.status(500).json({ error: err.sqlMessage });
    }
  });
}

//delete single employee
async function deleteEmployee(req, res) {
  let query = `DELETE FROM employee WHERE empId =${req.params.id}`;
  db.query(query, (err, rows) => {
    if (!err) {
      if (rows.changedRows == 0) {
        return res.status(204).json();
      }
      return res.status(200).json({ message: "Deleted successfully!" });
    } else {
      return res.status(500).json({ error: err.sqlMessage });
    }
  });
}

//insert an employee
async function addEmployee(req, res) {
  const { name, empCode, salary } = req.body;
  // console.log(name, empCode, salary);
  let query = `INSERT INTO employee (name ,empCode,salary) VALUES (?,?,?)`;

  db.query(query, [name, empCode, salary, empCode], (err) => {
    if (!err) {
      return res.status(200).json({ message: "Employee Added!" });
    } else {
      return res.status(500).json({ error: err.sqlMessage });
    }
  });
}

//update employee
async function updateEmployee(req, res) {
  const empId = req.params.id;
  let query = "";
  const { name, empCode, salary } = req.body;

  if (name && empCode && salary) {
    query = `UPDATE employee SET name = ?,empCode =?,salary=? WHERE empId = ?`;

    db.query(query, [name, empCode, salary, empId], (err, rows) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(200).json({ message: "Successfully updated!" });
    });
  } else if (name && !empCode && !salary) {
    query = `UPDATE employee SET name = ? WHERE empId = ?`;

    db.query(query, [name, empId], (err, rows) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(200).json({ message: "Successfully updated!" });
    });
  } else if (!name && empCode && !salary) {
    query = `UPDATE employee SET empCode = ? WHERE empId = ?`;

    db.query(query, [empCode, empId], (err, rows) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(200).json({ message: "Successfully updated!" });
    });
  } else if (!name && !empCode && salary) {
    query = `UPDATE employee SET salary = ? WHERE empId = ?`;

    db.query(query, [salary, empId], (err, rows) => {
      if (err) {
        return res.status(400).json({ message: err.sqlMessage });
      }
      return res.status(200).json({ message: "Successfully updated!" });
    });
  } else {
    return res.status(400).json({ message: "Bad request!" });
  }
}

module.exports = {
  getAllEmployee,
  getEmployee,
  deleteEmployee,
  addEmployee,
  updateEmployee,
};
