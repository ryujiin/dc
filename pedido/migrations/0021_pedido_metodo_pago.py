# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0020_auto_20150717_0411'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='metodo_pago',
            field=models.ForeignKey(blank=True, to='pedido.MetodoPago', null=True),
            preserve_default=True,
        ),
    ]
