import {DotIcon, IconContext, ShoppingCartSimpleIcon, User, UserIcon} from "@phosphor-icons/react"
import { useEffect, useMemo, useState } from "react"
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { createTheme, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, ThemeProvider, useMediaQuery } from "@mui/material"
import { Close, ExpandMore, Logout } from "@mui/icons-material"
import MenuIcon from '@mui/icons-material/Menu'
import { useCart } from "../contexts/CartContext"
import { useOrderSummary } from "../contexts/OrderSummaryContext"
import { useAuthWithCart } from "./MenusPage/hooks/useAuthWithCart"
import { useTranslation } from "react-i18next"

const theme = createTheme({
  breakpoints: {
    values: {
       xs: 0,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1536
    }
  }
})

export default function Navigation() {
    const {t, i18n} = useTranslation()
    const toggleLanguage = () => {
        const newLang = i18n.language === "ro" ? "en" : "ro"
        i18n.changeLanguage(newLang)
        localStorage.setItem('appLanguage', newLang)
    }

    const navItems = [
        {name: t("nav.home"), path: '/'},
        {name: t("nav.menus"), path: '/meniuri'},
        {name: t("nav.contact"), path: '/contact'},
        {name: t("nav.info"), path: '/informatii'}
    ]

    const {setShowOrderSummaryMobile} = useOrderSummary()

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)
    const [hasShadow, setHasShadow] = useState(false)
    const {user, logoutWithCart} = useAuthWithCart()

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)

    const {cartItemCount} = useCart()

    const [openDrawer, setOpenDrawer] = useState(false)
    const location = useLocation()

    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width: 1024px)')

    const handleLogout = async () => {
        await logoutWithCart()
        setAnchorEl(null)
        navigate('/')
    }

    useEffect(() => {
        if (openDrawer) setOpenDrawer(false)
    }, [location.pathname]) //eslint-disable-line

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        const handleScroll = () => {
            setHasShadow(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const DrawerList = useMemo(
        () => {
            const navItems = [
                { name: t("nav.home"), path: '/' },
                { name: t("nav.menus"), path: '/meniuri' },
                { name: t("nav.contact"), path: '/contact' },
                { name: t("nav.info"), path: '/informatii' }
            ]
        
            return (
                <>
                    <div className="flex items-center justify-between p-4">
                        <IconButton onClick={() => setOpenDrawer(false)} aria-label="inchide">
                            <Close />
                        </IconButton>
                    </div>
                    <Divider />

                    <List>
                        {navItems.map((item) => (
                            <ListItemButton
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                            >
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        sx: {
                                            fontWeight: location.pathname === item.path ? 700 : 400,
                                            color: location.pathname === item.path ? '#E7272C' : '#66635B'
                                        }
                                    }}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </>
            )
        },
        [location.pathname, t, i18n.language]
    )
  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${hasShadow ? 'shadow-lg bg-custom-yellow' : ''}`}>
        <div className='flex flex-wrap p-3 sm:p-4 justify-between items-center'>
            <img 
                src={`/assets/logoPizzerie.png`} 
                alt="logo pizzerie" 
                className='h-16' 
            />

            <div className='hidden md:flex gap-8'>
                 {navItems.map(({ name, path }) => (
                    <NavLink
                    key={name}
                    to={path}
                    className={({ isActive }) => `
                        relative flex flex-col items-center text-lg cursor-pointer transition-opacity duration-200
                        ${isActive ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-100"}
                    `}
                    >
                    {({ isActive }) => (
                        <>
                            {name}
                            {isActive && (
                            <DotIcon
                                size={20}
                                weight="fill"
                                className="absolute -bottom-4 animate-fade-in"
                            />
                            )}
                        </>
                    )}
                    </NavLink>
                ))}
            </div>


            <div className="flex gap-6 items-center">  
                <ThemeProvider theme={theme}>
                    <IconButton 
                        onClick={() => setOpenDrawer(true)}
                        aria-label="deschide meniul"
                        sx={{display: {xs: 'inline-flex', sm: "none"}}}
                    >
                        <MenuIcon sx={{height: '30px', width: '30px'}} />
                    </IconButton>
                </ThemeProvider>

                <div className="relative">
                    <ShoppingCartSimpleIcon
                        size={30}
                        weight="bold"
                        className="text-[#66635B] hover:text-black transition-all active:text-black cursor-pointer"
                        onClick={() => {
                            if(isMobile) {
                                setShowOrderSummaryMobile(true) 
                                navigate('/meniuri')   
                            } else {
                                navigate('/meniuri')
                            }                            
                        }}
                    />
                    <span className="absolute -top-2 -right-2 bg-custom-red text-xs text-white w-5 h-5 rounded-full flex items-center justify-center">
                        {cartItemCount}
                    </span>
                </div>

                {user ? (
                    <div className="flex items-center gap-2">
                        <IconButton
                            onClick={handleMenuClick}
                            size="small"
                            sx={{ml: 1}}
                            aria-controls={openMenu ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openMenu ? 'true' : undefined}
                        >
                            <span className="text-[#66635B] capitalize">
                            {
                                user.prenume?.length > 10
                                ? user.prenume.slice(0, 10) + '...'
                                : user.prenume
                            }
                            </span>
                            <ExpandMore />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openMenu}
                            onClose={handleMenuClose}
                            onClick={handleMenuClose}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    overflow: 'visible',
                                    mt: 1.5,
                                    minWidth: 150,
                                    borderRadius: '0.5rem',
                                    paddingX: '1rem',
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    }
                                }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem 
                                sx={{borderRadius: '0.5rem', paddingX: '10px'}} 
                                onClick={() => navigate('/profil')}
                            >
                                <ListItemIcon>
                                    <UserIcon size={24} weight="bold" />
                                </ListItemIcon>
                                <ListItemText sx={{color: '#66635B'}}>
                                    {t('nav.profile')}
                                </ListItemText>
                            </MenuItem>

                            <MenuItem 
                                sx={{borderRadius: '0.5rem', paddingX: '10px'}} 
                                onClick={handleLogout}
                            >
                                <ListItemIcon>
                                    <Logout></Logout>
                                </ListItemIcon>
                                <ListItemText sx={{color: '#66635B'}}>{t('nav.logout')}</ListItemText>
                            </MenuItem>
                        </Menu>    
                    </div>
                ) : (
                    <User 
                        size={30}
                        weight="bold"
                        onClick={() => setShowLogin(prev => !prev)}
                        className="text-[#66635B] hover:text-black transition-colors duration-200 cursor-pointer"
                    />
                )}
                
                {showLogin && (
                    showRegister ? (
                        <Register 
                            setShowRegister={setShowRegister} 
                            onClose={() => {
                                setShowLogin(false)
                                setShowRegister(false)
                            }}
                        />    
                    ) : (
                        <Login 
                            setShowRegister={setShowRegister}
                            onClose={() => setShowLogin(false)}
                        />
                    )
                )}
            </div>     
        </div>
        <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            PaperProps={{sx: {width: 280, backgroundColor: '#FEF7EA'}}}
            sx={{zIndex: 1300}}
        >
            {DrawerList}
        </Drawer>

        <button
            onClick={toggleLanguage}
            className="fixed bottom-4 right-4 z-[1000] cursor-pointer bg-white p-2 rounded-full shadow-md border transition-all active:scale-90 duration-200 ease-in-out border-gray-300"
        >
            {i18n.language === 'ro' ? (
                <img src="/assets/romania.png" alt="ro" className="w-10 h-10" />
            ) : (
                <img src="/assets/united-kingdom.png" alt="en" className="w-10 h-10" />
            )}
        </button>
    </div>
  )
}
