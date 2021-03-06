import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// @decs    Register new User
// @route   POST /auth
// @access  Public
export const Register = async (req, res) => {
    try {
        const {
            name,
            username,
            nip,
            bagian,
            email,
            phone,
            password,
            password_verify,
            jabatan
        } = req.body;


        // input validation
        if (!name || !username || !nip || !bagian || !email || !password || !password_verify || !jabatan) {
            return res
                .status(400)
                .json({ message: "Pastikan seluruh data telah terisi dengan benar" });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password minimum terdiri dari 8 karakter" });
        }

        if (password !== password_verify) {
            return res
                .status(400)
                .json({ message: "Verifikasi password tidak sesuai" });
        }


        // Checking existing user
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Email telah digunakan, silakan coba email yang lain" });
        }
        if (existingUsername) {
            return res
                .status(400)
                .json({ message: "Username telah digunakan, silakan coba username yang lain" });
        }


        // Hashing passsword
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        // return res
        //     .status(200)
        //     .json({ passwordHash, password })


        // Save new user
        const newUser = await new User({
            name,
            username,
            nip,
            bagian,
            jabatan,
            email,
            phone,
            passwordHash
        });

        const savedUser = await newUser.save();

        // Sign the token
        const token = jwt.sign({
            user: savedUser._id,
        }, process.env.JWT_SECRET);

        // Send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        });

        return res
            .status(201)
            .json({ message: `User dengan username ${username} berhasil disimpan` });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Oops there's some errors");
    }
}


// @decs    User Login
// @route   POST /auth/login
// @access  Public
export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // input validation
        if (!username || !password) {
            res
                .status(401)
                .json({ message: "Kolom username dan password harus diisi" })
        }


        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            res
                .status(401)
                .json({ message: "Username tidak ditemukan" });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordCorrect) {
            res
                .status(401)
                .json({ message: "Password tidak sesuai" });
        }

        // Sign the token
        const token = jwt.sign({
            user: existingUser._id,
        }, process.env.JWT_SECRET);

        // Send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({ message: "Berhasil login!" });
    }

    catch (err) {

    }
}

// @decs    Logout current user
// @route   POST /auth/logout
// @access  User only
export const Logout = async (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        .send();
}