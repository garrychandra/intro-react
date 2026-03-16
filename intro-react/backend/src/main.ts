import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Buku } from './models/Buku';
import {v4 as uuidv4} from 'uuid';
import { Orang } from './models/Orang';

const sequelize = new Sequelize('belajar-orm', 'postgres', 'postgres', {
  host: '127.0.0.1',
  port: 5432,
  dialect: 'postgres',
  models: [Buku, Orang],
});
const app = express();
app.use(express.json());

const PORT = 3000;

type Post = {
    id: string;
    title: string;
}

const posts: Post[] = [
    {
        id: '1',
        title: 'First Post'
    }
];

const bukuRouter = express.Router();
app.use('/post',bukuRouter)

bukuRouter.get('/', async (req, res) => {
    res.json({
        records: await Buku.findAll()
    });
})

bukuRouter.post('/', async (req, res) => {
    await Buku.create({
        id: uuidv4(),
        judul: req.body.judul,
        deskripsi: req.body.deskripsi,
        tahun: req.body.tahun,
        kategori: req.body.kategori,
        status: req.body.status,
        peminjam: req.body.peminjam,
        imageUrl: req.body.imageUrl,
        author: req.body.author
    }).then((record) => {
        res.json({
            record
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

bukuRouter.get('/:id', async (req, res) => {
    await Buku.findByPk(req.params.id).then((record) => {
        if(!record){
            res.status(404).json({
                success: false,
                message: 'record not found'
            })
            return;
        }
        res.json({
            record
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

bukuRouter.put('/:id', (req, res) => {
    Buku.findByPk(req.params.id).then((record) => {
        if(!record){
            res.status(404).json({
                success: false,
                message: 'record not found'
            })
            return;
        }
        record.judul = req.body.judul;
        record.deskripsi = req.body.deskripsi;
        record.tahun = req.body.tahun;
        record.kategori = req.body.kategori;
        record.status = req.body.status;
        record.peminjam = req.body.peminjam;
        record.save().then((updatedRecord) => {
            res.json({
                success: true,
                record: updatedRecord
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: err.message
            })
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

bukuRouter.delete('/:id', (req, res) => {
    Buku.findByPk(req.params.id).then((record) => {
        if(!record){
            res.status(404).json({
                success: false,
                message: 'record not found'
            })
            return;
        }
        record.destroy().then(() => {
            res.json({
                success: true,
                message: 'record deleted successfully'
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: err.message
            })
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
})

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World! Garry a'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get('/api/buku', async (req, res) => {
    try {
        const bukus = await Buku.findAll({
            include: [
                {
                    model: Orang,
                }]
        });
        res.status(200).json({data: bukus});

    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error});
    }
});

app.post('/api/buku', async (req, res) => {
    try {
        const {judul, deskripsi, tahun, kategori, status, peminjam, imageUrl, authorId} = req.body;
        if (!judul || !deskripsi || !tahun || !kategori || !status || !peminjam || !imageUrl || !authorId) {
            res.status(400).json({message: 'Semua field harus diisi'});
            return;
        }
        const newBuku = await Buku.create({
            id: uuidv4(),
            judul,
            deskripsi,
            tahun,
            kategori,
            status,
            peminjam,
            imageUrl,
            authorId
        });
        res.status(201).json({data: newBuku});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error});
    }
});
    