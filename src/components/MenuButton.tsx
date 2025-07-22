import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'

type MenuButtonProps = {
    background?: string
    colorForText?: string
}

export const MenuButton = styled(Button)<MenuButtonProps>(({background, colorForText, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: colorForText || theme.palette.primary.contrastText,
    background: background || theme.palette.primary.light,

    '&:hover': {
        backgroundColor: background ?
            theme.palette.action.hover :
            theme.palette.primary.main,
        color: colorForText ? theme.palette.primary.contrastText : '',
        transform: 'translateY(1px)',
    }
}))