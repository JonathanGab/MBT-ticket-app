import { View, Text } from 'react-native';
import { useGetProject } from '../../hooks/mutations/useGetProject';
import { useGetUsers } from '../../hooks/mutations/useGetUser';
import IFilter from '../Interface/IFilter';
import IProject from '../Interface/IProject';
import IUser from '../Interface/IUser';
import DropdownComponent from './DropdownComponent';

interface IProps {
    setFilterValue: Function;
    actualValues: IFilter;
}

export default function FilterItem({ setFilterValue, actualValues }: IProps): JSX.Element {
    function setProject(newV: string): void {
        setFilterValue({
            project: parseInt(newV),
            user: actualValues.user,
        });
    }
    function setUser(newV: string): void {
        setFilterValue({
            project: actualValues.project,
            user: parseInt(newV),
        });
    }
    // a modifier
    const dataProject: IProject[] | null = useGetProject();
    const dataUser: IUser[] | null = useGetUsers();
    if (dataProject === null || dataUser === null) {
        return (
            <View>
                <Text>loading</Text>
            </View>
        );
    }

    return (
        <View>
            <DropdownComponent data={dataProject} callback={setProject} label="Project" />
            <DropdownComponent data={dataUser} callback={setUser} label="User" />
        </View>
    );
}

