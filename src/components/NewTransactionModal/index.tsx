import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import React, { FormEvent, useState } from 'react';
import { api } from '../../services/api';

interface NewTrasactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

enum enType {
  deposit = 'deposit',
  withdraw = 'withdraw'
}

export function NewTrasactionModal({ onClose, isOpen }: NewTrasactionModalProps) {
  const [type, setType] = useState<enType>(enType.deposit);
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const handleCreateNetTransaction = (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      title,
      value,
      category,
      type
    };

    api.post('/trasaction', payload);
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      overlayClassName='react-modal-overlay' 
      className='react-modal-content'
    >
      <button type='button' onClick={onClose} className='react-modal-close'>
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNetTransaction}>
        <h2>Cadastrar Transação</h2>

        <input value={title} onChange={event => setTitle(event.target.value)} placeholder='Título' />

        <input value={value} onChange={event => setValue(Number(event.target.value))} placeholder='Valor' type='number' />

        <TransactionTypeContainer>
          <RadioBox 
            type='button' 
            onClick={() => setType(enType.deposit)}
            isActive={type === enType.deposit}
            activeColor='green'
          >
            <img src={incomeImg} alt='Entrada' />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type='button' 
            onClick={() => setType(enType.withdraw)}
            isActive={type === enType.withdraw}
            activeColor='red'
          >
            <img src={outcomeImg} alt='Saída' />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input value={category} onChange={event => setCategory(event.target.value)} placeholder='Categoria' />

        <button type="submit">Cadastrar</button>

      </Container>
    </Modal>
  )
}