import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 4, 
	message: "Demasiados intentos. Cuenta bloqueada por 15 min",
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

export const ReSendEmailLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, 
	limit: 3, 
	message: "Demasiados intentos. Cuenta bloqueada por 1 Hora",
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
    
   

