import { Flex, UnorderedList as Ul, ListItem as Li, Text, Button, Menu, MenuList, MenuItem ,MenuButton,IconButton} from '@chakra-ui/react';
import { NavLink } from "react-router-dom";
import themes from "../../utils/theme";
import { FaUserTie } from "react-icons/fa6";
import { useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log(localStorage.getItem('accessToken'),localStorage.getItem('refreshToken'));
        navigate('/login')
    };

    return (

        <Flex
            width="100vw"
            height={16}
            p={4}
            backgroundColor={themes.colors.primary['300']}
            justifyContent="space-between"
            alignItems={"center"}
            rounded="xl"
            shadow="md"
            margin={1}
        >

            <Flex justifyContent={"flex-start"} alignItems={'center'}>
                <Text fontSize="3xl" fontWeight="bold" color={themes.colors.neutral['700']} _hover={{ color: themes.colors.neutral['1000'] }} marginLeft={5} justifyContent={'center'}>
                    StaySafe
                </Text>
            </Flex>

            <Ul listStyleType="none" display="flex" gap={8} minWidth={6} marginRight={3} color={themes.colors.neutral['700']} >
                <Li _hover={{ color: themes.colors.neutral['1000'] }} fontSize={20}>
                    <NavLink to="/"  >
                        Dashboard
                    </NavLink>
                </Li>
                <Li _hover={{ color: themes.colors.neutral['1000'] }} fontSize={20}>
                    <NavLink to="/blogs"  >
                        Blogs
                    </NavLink>
                </Li>
                <Li _hover={{ color: themes.colors.neutral['1000'] }} fontSize={20}>
                    <NavLink to="/volunteer"  >
                        Volunteer
                    </NavLink>
                </Li>
                <Li _hover={{ color: themes.colors.neutral['1000'] }} fontSize={20}>
                    <NavLink to="/announcement"  >
                        Announcements
                    </NavLink>
                </Li>

                <Li _hover={{ color: themes.colors.neutral['1000'] }} fontSize={20}>
                    <NavLink to="/help"  >
                        Help Center
                    </NavLink>
                </Li>
                <Li _hover={{ color: themes.colors.neutral['1000'] }} fontSize={20}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<FaUserTie size={32} />}
                            variant="outline"
                        >
                            Profile
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen}>View Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem onClick={handleClick}>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                </Li>

                <Li  >
                    {/* <Button 
                    _hover={{ color: themes.colors.neutral['1000'] }}
                     variant="link" onClick={handleClick} 
                     fontSize={20} 
                     color= {themes.colors.neutral['700']}
                     style={{ padding: 0 }}>
                        Logout
                    </Button> */}
                </Li>
            </Ul>
        </Flex>
    );
}

export default Navbar;