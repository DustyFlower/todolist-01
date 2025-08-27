import {SxProps} from '@mui/material';

export const filterButtonsContainerSx: SxProps = {
    justifyContent: 'space-around'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    justifyContent: 'space-between',
    opacity: isDone ? '0.5' : '1',
    paddingRight: '15px'
})

export const PaperSx: SxProps = {p: '15px', mt: '15px'}

export const ButtonAppBarBoxSx: SxProps = {flexGrow: 1, paddingBottom: '80px'}