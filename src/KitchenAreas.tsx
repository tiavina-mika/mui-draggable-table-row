import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { kitchenAreas as items } from "./data";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./StrictModeDroppable";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  background: isDragging ? "#f7f7f7" : "",

  // styles we need to apply on draggables
  ...draggableStyle
});


const KitchenAreas = () => {
  const [kitchenAreas, setKitchenAreas] = useState([]);
  console.table(kitchenAreas.map(k => ({
    name: k.kitchenArea.name,
    order: k.order
  })))

  useEffect(() => {
    setKitchenAreas(items);
  }, []);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const orderedKitchenArea = reorder(
      kitchenAreas,
      result.source.index,
      result.destination.index
    )
    const updatedKitchenAreas = orderedKitchenArea.map((kitchenArea: any, index: number) => ({ ...kitchenArea, order: index + 1 }))

    setKitchenAreas(updatedKitchenAreas);
  }

  return (
    <TableContainer component={Paper}>
      <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="droppable">
        {(provided) => (
            <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
              <TableHead>
                <TableRow>
                  <TableCell component="th">Name</TableCell>
                  <TableCell align="left" component="th">Order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {kitchenAreas.map((kitchenArea, index) => (
                  <Draggable key={kitchenArea.kitchenArea.objectId} draggableId={kitchenArea.kitchenArea.objectId} index={index}> 
                    {(provided, snapshot) => (
                      <TableRow
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            userSelect: "none",
                            // background: snapshot.isDragging ? "#f7f7f7" : "",
                          }}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <TableCell component="th" scope="kitchenArea">
                            {kitchenArea.kitchenArea.name}
                          </TableCell>
                          <TableCell align="left">{kitchenArea.order}</TableCell>
                        </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </TableContainer>
  );
};

export default KitchenAreas;
