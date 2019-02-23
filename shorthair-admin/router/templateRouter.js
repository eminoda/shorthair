const templateSerivce = require("../service/templateService");
const Router = require("koa-router");
const router = new Router();
router.prefix("/template");

router.get("/:id", async (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = await templateSerivce.getTemplateById(id);
});

module.exports = router;
