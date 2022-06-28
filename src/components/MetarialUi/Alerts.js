import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const DangerAlert = (props) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{props.error}</Alert>
        </Stack>
    );
}

export { DangerAlert };