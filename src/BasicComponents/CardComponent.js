import Card from "@mui/material/Card";

export function CardComponent({props={},children}){

    const { sx={},className="" } = props;

    return (
        <Card sx={{...sx}} className={className}>
            {children}
        </Card>
    )
}
