import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import EditIcon from "@mui/icons-material/Edit"; // Import Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon

// eslint-disable-next-line react/prop-types
const ActionCard = ({ card = {}, isSelected = false, onClick = () => {}, onEdit = () => {}, onDelete = () => {} }) => {
  return (
    <Card
      sx={{
        width: "100%", 
        maxWidth: 250, 
        height: 100, 
        borderRadius: 2, 
        marginBottom: 2, 
        border: "2px solid #1E88E5", 
        '&:hover': {
          boxShadow: 3, 
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        data-active={isSelected ? "" : undefined}
        sx={{
          display: "flex", // Use flexbox for layout
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex", // Align avatar and content in a row
            alignItems: "center", // Vertically center the content
            padding: 2,
            width: "100%", // Ensure full width
            justifyContent: "space-between", // Space between avatar and buttons
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={card.image}
              alt={card.title}
              sx={{
                width: 48, // Reduced width of avatar
                height: 48, // Reduced height of avatar
                marginRight: 2, // Space between avatar and content
              }}
            />
            <CardContent sx={{ paddingLeft: 0 }}>
              <Typography variant="h6" component="div">
                {card.title || "Default Title"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description || "Default Description"}
              </Typography>
            </CardContent>
          </Box>

          {/* Edit and Delete Icons in Same Row with Smaller Gray Icons */}
          <Box
            sx={{
              display: "flex", // Align icons in a row
              padding: 0.5, // Space around icons
              justifyContent: "center", // Center the icons
              alignItems: "center", // Vertically center the icons
            }}
          >
            <IconButton size="small" sx={{ color: "grey.500", fontSize: 20 }} onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "grey.500", fontSize: 20 }} onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ActionCard;
