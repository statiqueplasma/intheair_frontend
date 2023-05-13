import { Button } from 'react-bootstrap';

function Bouton({children, type, couleurFond, couleurTexte, onClick}) {
    return (
        <Button onClick={onClick} type={type} style={{ color: couleurTexte, backgroundColor: couleurFond, border: `0px solid`, borderRadius: "30px" }}>{ children }</Button>
    );
}

export default Bouton;
