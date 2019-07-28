import { generateID } from '../helpers/IDHelper'
var tasks = [
    {
        id: generateID(),
        name: 'Học lập trình2',
        status: true
    },
    {
        id: generateID(),
        name: 'Đi chơi',
        status: false //0
    },
    {
        id: generateID(),
        name: 'Ngủ',
        status: true
    },
]
export default tasks;