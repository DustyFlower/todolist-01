import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ButtonAppBarBoxSx} from './Todolist.styles.ts';
import {MenuButton} from './MenuButton.tsx';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

type Props = {
    onChange: () => void
}

export function ButtonAppBar({onChange}: Props) {

    const theme = useTheme()

    return (
        <Box sx={ButtonAppBarBoxSx}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        What are you going to do?
                    </Typography>
                    <MenuButton background={theme.palette.primary.light}>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton>FAQ</MenuButton>
                    <Switch color={'default'}
                            onChange={onChange}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}