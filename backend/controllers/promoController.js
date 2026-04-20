const applyPromo = async (req, res) => {
  const { code, amount } = req.body;

  if (code === "SAVE10") {
    return res.json({
      success: true,
      discount: amount * 0.1,
      finalAmount: amount - amount * 0.1,
    });
  }
  
   if (code === "CART90") {
    const rawDiscount = amount * 0.9;
    const finalDiscount = Math.ceil(rawDiscount);
    const finalAmount = amount - finalDiscount;
    return res.json({
      success: true,
      discount: finalDiscount,
      finalAmount: finalAmount < 0 ? 0 : finalAmount,
    });
  }
  
 if (code === "OWAIS99") {
    const rawDiscount = amount * 0.99;
    const finalDiscount = Math.ceil(rawDiscount);
    const finalAmount = amount - finalDiscount;
    return res.json({
      success: true,
      discount: finalDiscount,
      finalAmount: finalAmount < 0 ? 0 : finalAmount,
    });
  }

  if (code === "FLAT50") {
    return res.json({
      success: true,
      discount: 50,
      finalAmount: amount - 50,
    });
  }

  if (code === "SAVE90") {
    return res.json({
      success: true,
      discount: 90,
      finalAmount: amount - 90,
    });
  }

  return res.json({ success: false, message: "Invalid Promo Code" });
};

export { applyPromo };
