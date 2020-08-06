import React from 'react';
import api from '../../services/api';

import './style.css';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

export interface Teacher {
    id: number,
    nome: string,
    avatar: string,
    assunto: string,
    bio: string,
    custo: number,
    whatsapp: string,
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem:React.FunctionComponent<TeacherItemProps> = ({teacher}) => {

    function createNewConection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.nome} title={teacher.nome} />
                <div>
                    <strong>{teacher.nome}</strong>
                    <span>{teacher.assunto}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.custo.toFixed(2)}</strong>
                </p>
                <a onClick={createNewConection} href={`https://wa.me/${teacher.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} title="Whatsapp" alt="Imagem entrar em contato" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;