# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0019_auto_20150717_0406'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modificacionpedido',
            name='estado',
        ),
        migrations.AddField(
            model_name='modificacionpedido',
            name='estado_actual',
            field=models.CharField(default='autenticado', max_length=100),
            preserve_default=False,
        ),
    ]
