# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pago', '0003_pago_descripcion'),
        ('pedido', '0021_pedido_metodo_pago'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='pago_pedido',
            field=models.ForeignKey(blank=True, to='pago.Pago', null=True),
            preserve_default=True,
        ),
    ]
