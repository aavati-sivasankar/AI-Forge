const prisma = require("../services/prisma");

const syncUser = async (req, res) => {
  try {
    console.log("Received User:", req.body);

    const {
      clerkId,
      email,
      firstName,
      lastName,
      imageUrl,
    } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({
        success: false,
        message: "clerkId and email are required",
      });
    }

    let user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId,
          email,
          firstName,
          lastName,
          imageUrl,
        },
      });

      console.log("✅ User Created");
    } else {
      user = await prisma.user.update({
        where: {
          clerkId,
        },
        data: {
          email,
          firstName,
          lastName,
          imageUrl,
        },
      });

      console.log("✅ User Updated");
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Sync User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  syncUser,
};