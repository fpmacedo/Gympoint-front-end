import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdCheck, MdClose } from 'react-icons/md';
import api from '~/Services/api';
import { Container, Nav, FormInserts, NumbersDiv, StringDiv } from './styles';

import history from '~/Services/history';

export default function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students?id=${id}`);
      console.tron.log(response);
      const initialData = {
        name: response.data.name,
        email: response.data.email,
        age: response.data.age,
        weight: response.data.weight,
        height: response.data.height,
      };
      // console.tron.log(initialData);
      setStudent(initialData);
    }
    loadStudent();
  }, [id]);

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    age: Yup.string().required('A idade é obrigatória'),
    weight: Yup.string().required('O peso é obrigatório'),
    height: Yup.string().required('A altura é obrigatória'),
  });

  async function handleSubmit(data) {
    try {
      data.height = data.height.replace(/,/g, '.');
      data.weight = data.weight.replace(/,/g, '.');
      await api.put(`/students/${id}`, data);
      history.push('/students');
    } catch (erro) {
      toast.error('Preencha todos os dados corretamente.');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit} initialData={student}>
        <Nav>
          <strong>Cadastro de aluno</strong>
          <div>
            <div>
              <Link to="/students">
                <MdClose size={20} color="#FFF" />
                CANCELAR
              </Link>
            </div>
            <button type="submit">
              <MdCheck size={18} color="#FFF" />
              SALVAR
            </button>
          </div>
        </Nav>
        <FormInserts>
          <StringDiv>
            <div>
              <div>
                <strong>NOME COMPLETO</strong>
                <Input name="name" placeholder="John Doe" />
              </div>

              <div>
                <strong>ENDEREÇO DE E-MAIL</strong>
                <Input
                  name="email"
                  type="email"
                  placeholder="exemplo@dominio.com"
                />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>IDADE</strong>
              <Input name="age" />
            </div>

            <div>
              <strong>PESO (em kg)</strong>
              <Input name="weight" />
            </div>

            <div>
              <strong>ALTURA</strong>
              <Input name="height" />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}
