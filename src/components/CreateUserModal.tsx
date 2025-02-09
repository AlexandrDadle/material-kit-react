import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { ROLES } from 'src/constants/roles';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (userData: { firstName: string; lastName: string; middleName: string; email: string; phoneNumber: string; userRole: string }) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose, onCreate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleCreate = () => {
    onCreate({ firstName, lastName, middleName, email, phoneNumber, userRole });
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setEmail('');
    setPhoneNumber('');
    setUserRole('');
    onClose();
  };

  const handleClose = () => {
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setEmail('');
    setPhoneNumber('');
    setUserRole('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} BackdropProps={{ style: { backgroundColor: 'transparent' } }}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" component="h2">
          Create User
        </Typography>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <TextField
          label="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{ style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel style={{ fontSize: 18 }}>Role</InputLabel>
          <Select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as string)}
            label="Role"
            style={{ fontSize: 18 }}
          >
            {Object.values(ROLES).map((role) => (
              <MenuItem key={role} value={role} style={{ fontSize: 18 }}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default CreateUserModal;