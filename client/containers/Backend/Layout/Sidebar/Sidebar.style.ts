import styled from 'styled-components'


const pinnedWidth = '220px'

export const Wrapper = styled.div<{pinned: boolean}>`
  display: flex;
  flex-direction: column;
  width: ${props => props.pinned ? pinnedWidth : '50px'};
  background: rgba(0, 0, 0, 0.2);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.5s;

  .brand .name,
  .menu-link .menu-label {
    opacity: ${props => props.pinned ? '1' : '0'};
  }

  &:hover {
    width: ${pinnedWidth};

    .brand .name,
    .menu-link .menu-label {
      opacity: 1;
    }
  }
`

export const Header = styled.div`
  display: flex;
  width: ${pinnedWidth};
  padding: 10px 15px 10px 0px;
  background-color: rgba(0, 0, 0, 0.25);
  color: #ffffff;

  .brand {
    display: flex;
    flex: 1;

    .logo {
      display: inline-block;
      width: 50px;
      text-align: center;
    }

    .name {
      display: inline-block;
      transition: all 0.5s;
    }
  }
`

export const MenuToggler = styled.button`
  display: inline-block;
  color: #ffffff;
  margin-left: auto;
`

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

export const MenuItem = styled.li`
  display: inline-flex;
  flex: 1;
  background-color: transparent;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

export default {
  Wrapper,
  Header,
  MenuToggler,
  Menu,
  MenuItem,
}