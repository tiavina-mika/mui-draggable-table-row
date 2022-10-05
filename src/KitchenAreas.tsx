import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { kitchenAreas as items } from "./data";
import { useEffect, useState } from "react";

const KitchenAreas = () => {
  const [kitchenAreas, setKitchenAreas] = useState([]);

  useEffect(() => {
    setKitchenAreas(items);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {kitchenAreas.map((kitchenArea) => (
            <TableRow
              key={kitchenArea.kitchenArea.objectId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="kitchenArea">
                {kitchenArea.kitchenArea.name}
              </TableCell>
              <TableCell align="left">{kitchenArea.order}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default KitchenAreas;
